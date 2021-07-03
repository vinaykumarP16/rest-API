import React from 'react'
import {Modal, ModalHeader, ModalFooter , ModalBody ,Table ,Button  } from 'reactstrap';
import {  FormGroup , Input } from 'reactstrap';
import axios from 'axios';

export default class App extends React.Component {
    state={
      books:[],
      newBookData:{
        title:"",
        rating:""
      },
      editBookData:{
        id:"",
        title:"",
        rating:""
      },            
      NewBookModal:false,
      editBookModal:false
    }

   componentDidMount(){
      this._refreshBooks();
    }

    toggleNewBookModal(){
      this.setState({
        NewBookModal: ! this.state.NewBookModal
      })
    }

    toggleEditBookModal(){
      this.setState({
        editBookModal: ! this.state.editBookModal
      })
    }

    addBook(){
      axios.post(`http://localhost:3000/books`,this.state.newBookData).then((response)=>{
        let { books }= this.state;
        books.push(response.data);
        this.setState({books, NewBookModal:false, newBookData:{
        title:"",
        rating:""
      }});
      })
    }

    updateBook(){
      let {title,rating} = this.state.editBookData;
      axios.put('http://localhost:3000/books/' + this.state.editBookData.id,{
        title,rating
      }).then((response)=>{
        this._refreshBooks();
        this.setState({
          editBookModal:false, editBookData:{ id:"",title:"",rating:""}
        })
      });
    }

    _refreshBooks(){
      axios.get(`http://localhost:3000/books`).then((response)=>{
        this.setState({
          books:response.data
        })
      });
    }

    editBook(id,title,rating){
      this.setState({
        editBookData:{id,title,rating}, editBookModal:!this.state.editBookModal
      })
    }

    deleteBook(id){
      axios.delete('http://localhost:3000/books/'+id).then((response)=>{
        this._refreshBooks();
      })
    }


  render() {
    let books=this.state.books.map((book)=>{
      return(
                <tr key={book.id}>
                        <th>{book.id}</th>
                        <th>{book.title}</th>
                         <th>{book.rating}</th>
                        <th>
                          <Button color="success" size="sm" className="mx-2" 
                          onClick={this.editBook.bind(this,book.id,book.title, book.rating)}>edit</Button>
                          <Button color="danger" size="sm" onClick={this.deleteBook.bind(this, book.id)}>delete</Button>
                        </th>
                  </tr>
        )
    });
    return (
      <div className="App container">
        <h1>BOOK APP</h1> 
            <Button className="my-2" color="primary" onClick={this.toggleNewBookModal.bind(this)}>add book</Button>
            <Modal isOpen={this.state.NewBookModal} toggle={this.toggleNewBookModal.bind(this)} >
            <ModalHeader toggle={this.toggleNewBookModal.bind(this)}>Add new Book</ModalHeader>
            <ModalBody>
                <FormGroup>
                <Input placeholder="Title"  id="title" value={this.state.newBookData.title} onChange={(e)=>{
                  let {newBookData}=this.state;
                  newBookData.title=e.target.value;
                  this.setState({ newBookData })
                }}/>
                <Input placeholder="rating"  id="rating" value={this.state.newBookData.rating} onChange={(e)=>{
                  let {newBookData}=this.state;
                  newBookData.rating=e.target.value;
                  this.setState({ newBookData })
                }}/>
                </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.addBook.bind(this)}>Add book</Button>{' '}
              <Button color="secondary" onClick={this.toggleNewBookModal.bind(this)}>Cancel</Button>
            </ModalFooter>
            </Modal>

             <Modal isOpen={this.state.editBookModal} toggle={this.toggleEditBookModal.bind(this)} >
            <ModalHeader toggle={this.toggleEditBookModal.bind(this)}>Add new Book</ModalHeader>
            <ModalBody>
                <FormGroup>
                <Input placeholder="Title"  id="title" value={this.state.editBookData.title} onChange={(e)=>{
                  let {editBookData}=this.state;
                  editBookData.title=e.target.value;
                  this.setState({ editBookData })
                }}/>
                <Input placeholder="rating"  id="rating" value={this.state.editBookData.rating} onChange={(e)=>{
                  let {editBookData}=this.state;
                  editBookData.rating=e.target.value;
                  this.setState({ editBookData })
                }}/>
                </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.updateBook.bind(this)}>Updatebook</Button>{' '}
              <Button color="secondary" onClick={this.toggleEditBookModal.bind(this)}>Cancel</Button>
            </ModalFooter>
            </Modal>




            <Table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Rating</th>
                    <th>Actions</th>
                  </tr> 
                </thead>
                <tbody>
                  {books}
                </tbody>
            </Table>    
      </div>
    )
  }
}










/*import './App.css';
import React,{useState} from 'react';
import axios from 'axios';

function App() {

  const[image,setImage]=useState('');
  const[maindata,setMaindata]=useState([]);

  const myfunc=async()=>{
    const data = await axios(`http://localhost:3000/myfriends`);
    setMaindata(data.data);
    try{
       console.log(data.img);
          for(var i=0;i<data.data.length;i++){
            console.log(data.data[i].name)
            console.log(data.data[i].email)
            console.log(data.data[i].education)
            console.log(data.data[i].area)
          }
    }catch(error){
      console.log("unable to get data");
    }
  } 


  return (
    <div className="App">
        <h1>hello react</h1> 
        <button onClick={myfunc}>fetch</button>
        {maindata.length}
        
          {maindata.length>0 ? <div>  
            maindata.map(()=> <li>{}</li>)
            </div>:<h1>fetch data first</h1>} 
       
    </div>
  );
}

export default App;
*/