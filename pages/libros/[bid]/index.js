import Link from "next/link";
export async function getStaticProps({ params }){
	const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/${params.bid}`)
	const data = await res.json();
	return {
		props:{
			books: data
		}
	}
}

export async function getStaticPaths(){
	const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books`)
	const data = await res.json();
	return {
		paths: data.map(book => ({
				params: { bid: String(book.id) }
			})
		),
		fallback: false
	}
}

const BookDetail = ({books}) => {
	return(
		<div>
			<pre>{JSON.stringify(books)}</pre>
			<h1>Libros -- {book.id} </h1>
			<ul data-cy="book-list">
				{books.map(book => (
					<li key={`book-${book.id}`}>
						<Link 
						href={`/libros/${book.id}`}
						data-cy={`link-to-visit-book-${book.id}`}>
							{book.title}
						</Link>
						{'-'}
						<Link 
							href={`/libros/${book.id}/editar`}
							data-cy={`link-to-edit-book-${book.id}`}>
							Editar
						</Link>
					</li>
				))}
			</ul>
			<Link href="/libros/crear">Create Book</Link>
		</div>		
		
	)

}
  export default BookDetail