import {useIdentity} from "@/hooks/useIdentity.ts";
import {useEffect} from "react";

export const IndexPage = () => {
    const {userId, createIdentity} = useIdentity()

    useEffect(() => {
        if (!userId) {
            createIdentity()
        }
    }, [createIdentity, userId])

    return (
        <div>
            {userId ? "LOCAL" : "NO LOCAL"}
        </div>
    )
}