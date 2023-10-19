import express from 'express';
import { Book } from '../models/bookModel.js';

const router = express.Router();

// create a book
router.post('/', async (request, response) => {
    try{
        if(
            !request.body.title||
            !request.body.author||
            !request.body.publishYear
        ){
           return response.status(400).send({message: 'Send all required felds: title, author, publishYear'}) 
        }else{
            const newBook = {
                title : request.body.title,
                author : request.body.author,
                publishYear : request.body.publishYear
            }
            const book = Book.create(newBook);
            return response.status(201).send(book);
        }
    }catch (e){
        console.log(e.message);
        response.status(500).send({message: e.message})
    }
})

// get all books
router.get('/', async (request, response)=> {
    try{
        const books = await Book.find({});
        return response.status(200).json({
            count: books.length,
            data: books
        });
    }catch(e){
        console.log(e.message);
        response.status(500).send({message: e.message});
    }
});

// get book by id
router.get('/:id', async(request, response)=>{
    try{
        const {id} = request.params;
        const book = await Book.findById(id);
        return response.status(200).json({data: book});
    }catch(e){
        console.log(e.message);
        response.status(500).send({message: e.message});
    }
})

// update a book
router.put('/:id', async(request, response)=>{
    try{
        if(
            !request.body.title||
            !request.body.author||
            !request.body.publishYear
        ){
           return response.status(400).send({message: 'Send all required felds: title, author, publishYear'}) 
        }else{
            const {id} = request.params;
            const result = await Book.findByIdAndUpdate(id, request.body);
            if (!result){
                return response.status(404).json({message: 'Book not found'});
            }else{
                return response.status(200).json({message: 'Book updated successfully!'});
            }
        }
    }catch(e){
       console.log(e.message); 
       response.status(500).send({message: e.message});
    }
})

//delete a book
router.delete('/:id', async(request, response) =>{
try{
    const {id} = request.params;
    const result= await Book.findByIdAndDelete(id);
    if (!result){
        return response.status(404).json({message: 'Book not found'});
    }else{
        return response.status(200).json({message: 'Book deleted!'});
    }
}catch(e){
    console.log(e.message);
    response.status(500).send({message: e.message});
}
})

export default router;