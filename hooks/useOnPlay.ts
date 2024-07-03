import { Song } from "@/types";
import usePlayer from "./usePlayer";
import useAuthModel from "./useAuthModel";
import { useUser } from "./useUser";
import useSubscribeModel from "./useSubscribeModel";

const useOnPlay = (songs: Song[])=>{
    const player = usePlayer();
    const authModel = useAuthModel();
    const subscribeModel = useSubscribeModel();
    const { user, subscription } = useUser();

    const onPlay = (id: string)=>{
        if(!user){
            return authModel.onOpen();
        }
        
        if(!subscription){
            return subscribeModel.onOpen();
        }
        player.setId(id);
        player.setIds(songs.map((songs)=>songs.id));
    };

    return onPlay;
    
};
export default useOnPlay;