import { PostCompraMessageType, PostCompraStatusType } from "@/app/lib/types";

export default function PostNotification({postCompraType}: {postCompraType: PostCompraMessageType}) {
    let postCompraStatus: PostCompraStatusType = {
        status: "¡Ups!",
        title: "La compra no se pudo completar",
        description: "La compra no se pudo realizar, intente nuevamente.",
    }

    if (postCompraType.type === "approved") {
        postCompraStatus = {
            status: "Éxito",
            title: "¡Gracias por tu compra!",
            description: "La compra fue realizada de forma exitosa, disfrute de sus productos!",
        }
    } else if (postCompraType.type === "failure") {
        postCompraStatus = {
            status: "Algo salió mal",
            title: "Error al realizar la compra",
            description: "Debido a un error la compra no se pudo completar, intente nuevamente.",
        }
    }
  return (
    <>
      <div className="grid h-screen place-content-center bg-white px-4">
        <div className="text-center">
          <h1 className="text-9xl font-black text-gray-300">{postCompraStatus.status}</h1>

          <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {postCompraStatus.title}
          </p>

          <p className="mt-4 text-gray-500">{postCompraStatus.description}</p>
        </div>
      </div>
    </>
  );
}
