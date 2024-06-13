'use client';

export default function CloseModal({modal_id}) {
	return <button onClick={(e) => document.getElementById(modal_id).close()}
				className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
				X
			</button>
}