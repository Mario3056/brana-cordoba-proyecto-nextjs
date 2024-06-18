import { redirect } from "next/navigation";

export async function GET(request: Request){
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    if (status === "approved") {
		redirect("/postcompra/success");
        
    }else {
        redirect("/postcompra/failure");
    }
}