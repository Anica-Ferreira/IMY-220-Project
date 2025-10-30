// Anica Ferreira u24581802

const { useState } = React;
const { useRef } = React;

const books = [
    {
        title: "The Lord of the Rings",
        author: "J.R.R. Tolkien",
        genre: "Fantasy",
        status: "Busy Reading",

    },
    {
        title: "1984",
        author: "George Orwell",
        genre: "Dytopian",
        status: "Read",

    },
    {
        title: "Dune",
        author: "Frank Herbert",
        genre: "Science Fiction",
        status: "Want to Read",

    }
];

//component to display a single book
const Book = ({book, handleChangeStatus, handleDelete, handleSave, handleEdit}) =>{
    const [editTitle, setEditTitle]   = useState('');
    const [editAuthor, setEditAuthor] = useState('');
    const [editGenre, setEditGenre]   = useState('');

    const clickEdit = () => {
        if(book.editing){
            //save changes
            handleSave(editTitle, editAuthor, editGenre);
        }else{
            //go into edit mode
            setEditTitle(book.title);
            setEditAuthor(book.author);
            setEditGenre(book.genre);
            handleEdit();
        }
    }

    return(
        <div className="Book">
            {!book.editing &&(
            <div>
                <h2>{book.title}</h2>
                <h3>{book.author}</h3>
                <p>{book.genre}</p>
                <p>{book.status}</p>
            </div>)}

            {book.editing &&(
            <div>
                <input placeholder="Enter a title" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} /><br/>
                <input placeholder="Enter an author" value={editAuthor} onChange={(e) => setEditAuthor(e.target.value)} /><br/>
                <input placeholder="Enter a genre" value={editGenre} onChange={(e) => setEditGenre(e.target.value)} /><br/>
                <p>{book.status}</p>
            </div>)}

            <div className="buttons">
                <button className="button" onClick={handleChangeStatus}>Change Status</button>
                <button className="button" onClick={clickEdit}>{book.editing ? "Save Changes" : "Edit"}</button>
                <button className="button" onClick={handleDelete}>Delete</button>
            </div>
        </div>
    );
}

//component to display all books alphabetically
const BookList = ({ books, handleChangeStatus, handleDelete, handleEdit, handleSave }) =>{
    return (
		<div className="BookList">
			{   
            //sort books alphabetically by title
			books.sort((a, b) => a.title.localeCompare(b.title))
            .map((book, index) => {
				return (
					<Book
						key={index}
						book={book}
                        handleChangeStatus={() => handleChangeStatus(index)}
                        handleDelete={() => handleDelete(index)}
                        handleEdit={() => handleEdit(index)}
                        handleSave={(title, author, genre) => handleSave(index, title, author, genre)}
					/>
				);
			})
			}
		</div>
	);
}

//Search component
const Search = (props) =>{
    const searchInputRef = useRef();
    
    const search = (event) =>{
        event.preventDefault();
        const input = searchInputRef.current.value;
        props.handleSearch(input);
    }

    return (
        <form onSubmit={search}>
        <label htmlFor="search">Search</label>
        <input
            type="text"
            id="search"
            name="search"
            placeholder="Search something..."
            ref={searchInputRef}
        />
        <input className="button" type="submit" value="search"/>
        </form>
    );
};

//AddBook componenet
const AddBook = (props) => {
    return (
	    <div id="add">
		    <button className="button"
				onClick={props.handleAddBook}>
				Add Book
			</button>
		</div>
	);
};
  
const App = () => {
    const[currBooks, setCurrBooks] = useState(books);
    const [allBooks, setAllBooks] = useState(books);
    const [editingIndex, setEditingIndex] = useState(-1);

    //change status based on current status
    const changeStatus = (index) =>{
		const updatedAll = allBooks.map((book, i) => {
            if(i === index){
                let newStatus;
                if(book.status === "Want to Read"){
                    newStatus = "Busy Reading";
                }else if(book.status === "Busy Reading"){
                    newStatus = "Read";
                }else if(book.status === "Read"){
                     newStatus = "Want to Read";
                }
                return { ...book, status: newStatus};
            }
            return book;
        });
        setAllBooks(updatedAll);
        setCurrBooks(updatedAll);
	};

    const addBook = () =>{
        const newBook =
        {
            title : "",
			author : "",
			genre : "",
            status : "Want to Read",
            editing: false
        }

        const updatedAll = [...allBooks, newBook];
        setAllBooks(updatedAll);
        setCurrBooks(updatedAll);
    }

    const searchBook = (term) =>{
        if(!term){
            setCurrBooks(allBooks);
        }else{
            const found = allBooks.filter(book => {
                return book.title.toLocaleUpperCase().includes(term.toUpperCase());
            });
            setCurrBooks(found);
        }
    }

    const deleteBook = (index) =>{
        //get book to delete
        const toDelete = allBooks[index];
        const updatedAll = allBooks.filter(book => book !== toDelete);
        setAllBooks(updatedAll);
        setCurrBooks(updatedAll);
    }

    const editBook = (index) =>{
        const updatedAll = allBooks.map((book, i) =>{
            if(i === index){
                return { ...book, editing: true };
            }else if(i === editingIndex && editingIndex !== index){
                return { ...book, editing: false };
            }
            return book;
        });
        setAllBooks(updatedAll);
        setCurrBooks(updatedAll);
        setEditingIndex(index);
    }

    const saveChanges = (index, title, author, genre) =>{
        const updatedAll = allBooks.map((book, i) =>{
            if(i === index){
                return {
                    title: title,
                    author: author,
                    genre: genre,
                    status: book.status,
                    editing: false
                };
            }
            return book;
        });
        setAllBooks(updatedAll);
        setCurrBooks(updatedAll);
        setEditingIndex(-1);
    }

    return (
        <div>
            <Search handleSearch={searchBook}/>
            <AddBook handleAddBook={addBook}/>
            <BookList 
                books={currBooks} 
                handleDelete={deleteBook} 
                handleChangeStatus={changeStatus}
                handleEdit={editBook}
                handleSave={saveChanges}
            />
        </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);