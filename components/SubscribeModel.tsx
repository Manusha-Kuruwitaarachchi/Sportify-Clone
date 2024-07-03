import Button from './Button'; // Replace with your actual button library
import { Price, ProductWithPrice } from '@/types';
import Model from './Model'; // Assuming this is your Modal component
import { useState } from 'react';
import { useUser } from '@/hooks/useUser';
import toast from 'react-hot-toast';
import { getStripe } from '@/libs/stripeClient';
import { postData } from '@/libs/helpers';
import useSubscribeModel from '@/hooks/useSubscribeModel';

interface SubscribeModelProps {
    products: ProductWithPrice[];
}

const formatPrice = (price: Price) => {
    const priceString = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: price.currency,
        minimumFractionDigits: 0
    }).format((price?.unit_amount || 0) / 100);

    return priceString;
};

const SubscribeModel: React.FC<SubscribeModelProps> = ({
    products
}) => {
    const SubscribeModel = useSubscribeModel();
    const { user, isLoading, subscription } = useUser();
    const [priceIdLoading, setPriceIdLoading] = useState<string | undefined>();

    const onChange = (open: boolean) => {
        if(!open){
            SubscribeModel.onClose();
        }
    }

    const handleCheckout = async (price: Price) => {
        setPriceIdLoading(price.id);
        if (!user) {
            setPriceIdLoading(undefined);
            toast.error("Must be logged in");
            return;
        }

        if (subscription) {
            setPriceIdLoading(undefined);
            toast("Already subscribed");
            return;
        }

        try {
            const { sessionId } = await postData({
                url: '/api/webhooks/create-checkout-session',
                data: { price }
            });
            const stripe = await getStripe();
            stripe?.redirectToCheckout({ sessionId });
        } catch (error) {
            toast.error((error as Error)?.message);
        } finally {
            setPriceIdLoading(undefined);
        }
    };

    let content: React.ReactNode = (
        <div className="text-center">
            No products available.
        </div>
    );

    if (products.length) {
        content = (
            <div>
                {products.map((product) => {
                    if (!product.prices?.length) {
                        return (
                            <div key={product.id}>
                                No Prices Available
                            </div>
                        );
                    } else {
                        return (
                            <div key={product.id}>
                                {product.prices.map((price) => (
                                    <Button
                                        key={price.id}
                                        onClick={() => handleCheckout(price)}
                                        disabled={isLoading || price.id === priceIdLoading}
                                        className='mb-4'
                                    >
                                        {`Subscribe for ${formatPrice(price)} ${price.interval}`}
                                    </Button>
                                ))}
                            </div>
                        );
                    }
                })}
            </div>
        );
    }

    if (subscription) {
        content = (
            <div className='text-center'>
                Already Subscribed
            </div>
        );
    }

    return (
        <Model
            title="Only for premium users"
            description="Listen to music with Sportify Premium"
            isOpen={SubscribeModel.isOpen} 
            onChange={onChange} 
        >
            {content}
        </Model>
    );
};

export default SubscribeModel;
