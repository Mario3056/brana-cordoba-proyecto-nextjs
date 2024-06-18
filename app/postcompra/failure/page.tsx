import type { PostCompraStatusType } from "@/app/lib/types";
import PostNotification from "@/app/ui/postcompra/postNotification";

export default function PostCompraFailure() {
  const postCompraStatus: PostCompraStatusType = {
    status: "¡Ups!",
    title: "La compra no se pudo completar",
    description: "La compra no se pudo completar, intente nuevamente.",
  }

  return (
    <>
      <PostNotification postCompraMessage={postCompraStatus}/>
    </>
  );
}