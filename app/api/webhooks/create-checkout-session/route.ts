import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { stripe } from "@/libs/stripe";
import { getURL } from "@/libs/helpers";
import { createOrRetrieveCustomer } from "@/libs/supabaseAdmin";

export async function POST(request: Request) {
    const { price, quantity = 1, metadata = {} } = await request.json();

    try {
        const supabase = createRouteHandlerClient({
            cookies,
        });

        const { data: { user } } = await supabase.auth.getUser();

        // Ensure the user is authenticated
        if (!user) {
            return new NextResponse('User not authenticated', { status: 401 });
        }

        const customer = await createOrRetrieveCustomer({
            uuid: user?.id ||'',
            email: user?.email ||'',
        });

        // Ensure customer is a valid string
        if (!customer) {
            return new NextResponse('Customer not found', { status: 404 });
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            billing_address_collection: 'required',
            customer: customer, // Pass the customer ID directly
            line_items: [
                { 
                    price: price.id,
                    quantity 
                }
            ],
            mode: 'subscription',
            allow_promotion_codes: true,
            subscription_data: {
                metadata, // Attach any additional metadata here
            },
            success_url: `${getURL()}/account`,
            cancel_url: `${getURL()}`,
        });

        return NextResponse.json({ sessionId: session.id });
    } catch (error: any) {
        console.error('Error creating Stripe checkout session:', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
