'use client';

// import { createComment, State } from "@/app/lib/actions";
import { createComment, State } from "@/app/lib/actions_local";

import StarPicker from "@/app/ui/starPicker";
import { useFormState, useFormStatus } from "react-dom";
import { useState } from "react";

function Submit() {
    const { pending } = useFormStatus();
    return (
        <div className="p-2 w-full">
        <button 
            type="submit" 
            className={pending ? 'flex mx-auto bg-gray-300 border-0 py-2 px-8 rounded text-lg cursor-not-allowed opacity-50' : 'flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg'}
            disabled={pending}
        >
            {pending ? 'Agregando...' : 'Agregar'}
        </button>
    </div>
    );
  }

export default function AddNewCommentForm({ product_id }: { product_id: string }) {
    const initialState = { errors: {}, message: null };
    const [state, dispatch] = useFormState<State, FormData>(createComment, initialState);
    const [localFormData, setLocalFormData] = useState({
        name: '',
        content: '',
    });

    const handleChange = (e:any) => {
        const {name, value} = e.target;

        setLocalFormData({
            ...localFormData, 
            [name]: value
        });
    }
    
    function handleReset(){
        setLocalFormData({
            name: '',
            content: '',
        });
    }

    const handleSubmit = async (formData: FormData) => {
        await dispatch(formData);

        handleReset();
    }

    return (
        <>
            <form id="addNewCommentForm" action={handleSubmit} className="lg:w-1/2 md:w-2/3 mx-auto">
                <input type="hidden" name="related_product_id" value={product_id} />
                <div className="flex flex-wrap -m-2">
                    <div className="p-2 w-full">
                        <div className="relative">
                            <label className="leading-7 text-sm text-gray-600">Nombre usuario</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={localFormData.name}
                                onChange={handleChange}
                                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                aria-describedby="name-error"
                            />
                            <div id="status-error" aria-live="polite" aria-atomic="true">
                                {state.errors?.name &&
                                    state.errors.name.map((error: string) => (
                                        <p className="mt-2 text-sm text-red-500" key={error}>
                                            {error}
                                        </p>
                                    ))}
                            </div>
                        </div>
                    </div>
                    <div className="p-2 w-full">
                        <div className="relative">
                            <label className="leading-7 text-sm text-gray-600">Puntuación</label>
                            <br />
                            <StarPicker />
                        </div>
                    </div>
                    <div className="p-2 w-full">
                        <div className="relative">
                            <label className="leading-7 text-sm text-gray-600">Comentario</label>
                            <textarea 
                                id="content" 
                                name="content"
                                value={localFormData.content}
                                onChange={handleChange}
                                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                                aria-describedby="content-error"
                            ></textarea>
                            <div id="content-error" aria-live="polite" aria-atomic="true">
                                {state.errors?.content &&
                                    state.errors.content.map((error: string) => (
                                        <p className="mt-2 text-sm text-red-500" key={error}>
                                            {error}
                                        </p>
                                    ))}
                            </div>
                        </div>
                    </div>
                    <Submit/>
                </div>
            </form>
        </>
    )
}