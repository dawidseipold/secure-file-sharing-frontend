import {useState} from "react";
import {exportPrivateKeyToPEM, exportPublicKeyToPEM, generateKeyPair} from "@/utils/crypto/keys.ts";
import {publishKey} from "@/utils/api/endpoints.ts";
import {useMutation} from "@tanstack/react-query";

export const useIdentity = () => {
    const [userId, setUserId] = useState<string | null>(localStorage.getItem("user_id"));

    const mutation = useMutation({
        mutationFn: async () => {
            const keyPair = await generateKeyPair();
            const publicPem = await exportPublicKeyToPEM(keyPair.publicKey);
            const privatePem = await exportPrivateKeyToPEM(keyPair.privateKey);

            const response = await publishKey(publicPem)

            return {
                user_id: response.user_id,
                private_key: privatePem
            }
        },
        onSuccess: (data) => {
            localStorage.setItem("user_id", data.user_id);
            localStorage.setItem("private_key", data.private_key)

            setUserId(data.user_id)
        }
    })

    return {
        userId,
        isReady: !!userId,
        createIdentity: mutation.mutate,
        isLoading: mutation.isPending
    }
}