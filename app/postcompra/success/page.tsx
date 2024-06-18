'use client';

import type { PostCompraStatusType } from "@/app/lib/types";
import { useCartStore } from "@/app/lib/cart/useCartStore";
import PostNotification from "@/app/ui/postcompra/postNotification";

export default function PostCompraSuccess() {
    const clearCart = useCartStore((state) => state.clearCart);
    const postCompraStatus: PostCompraStatusType = {
        status: "Éxito",
        title: "¡Gracias por tu compra!",
        description: "La compra fue realizada de forma exitosa, disfrute de sus productos!",
    }

    clearCart();

    return (
        <>
            <PostNotification postCompraMessage={postCompraStatus}/>
        </>
    );
}