import Link from "next/link";

export async function getStaticProps(){
	const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books`);
	const data = await res.json();
	return {
		props:{
			books: data
		}
	}
}

const BookList = ({books}) => {
	async function handleDelete(e,bookId){
		e.preventDefault()
		// setSubmitting(true)
		// console.log(bookTitle)
		const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/${bookId}`,{
			method: 'POST',
			headers:{
				accept: 'application/json',
				'content-type': 'application/json'
			},
			body: JSON.stringify({
				_method: 'DELETE',
			})
		})
		if(res.ok){
			window.location.href = '/libros';
		}
	}
	return(
		<div>
			{/* <pre>{JSON.stringify(books)}</pre> */}
			<h1>Libros</h1>
			<ul>
				{books.map(book => (
					<li key={`book-${book.id}`}>
						<Link href={`/libros/${book.id}`}>
							{book.title}
						</Link>
						{'-'}
						<Link href={`/libros/${book.id}/editar`}>
							Editar
						</Link>
						{'-'}
						<form onSubmit={(event) => handleDelete(event, book.id)}
							style={{ display: 'inline'}}>
								<button 
									data-cy={`link-to-delet-book-${book.id}`}>
										Eliminar</button>
						</form>
					</li>
				))}
			</ul>
			<Link href="/libros/crear">Create Book</Link>
		</div>		
		
	)

}
  export default BookList

