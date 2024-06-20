import { PostCompraStatusType } from "@/app/lib/types";
import TitleEffect from '@/app/ui/setTitle';

export default function PostNotification({postCompraMessage}: {postCompraMessage: PostCompraStatusType}) {
  return (
    <>
	  <TitleEffect title={postCompraMessage.title} />
      <div className="grid h-screen place-content-center bg-white dark:bg-base-100 px-4">
        <div className="text-center">
          <h1 className="text-9xl font-black text-gray-300 dark:text-gray-500">{postCompraMessage.status}</h1>

          <p className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
            {postCompraMessage.title}
          </p>

          <p className="mt-4 text-gray-500 dark:text-gray-100">{postCompraMessage.description}</p>
        </div>
      </div>
    </>
  );
}
