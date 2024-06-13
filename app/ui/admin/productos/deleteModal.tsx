 'use client';
 
export default function DeleteModal({modal_id}) {
	return <button onClick={(event) => { document.getElementById(modal_id).showModal(); }}> Eliminar </button>
}