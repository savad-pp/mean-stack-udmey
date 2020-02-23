const Posts=require('../models/post')

exports.createPost = (req,res,next)=>{
    const url = req.protocol+ '://' + req.get('host')
      const postss=new Posts({
          //id: req.body.id,
          title:req.body.title,
          content:req.body.content,
          imagePath: url + "/images/" + req.file.filename,
          creator:req.userData.userId
      })
  console.log("---",req.userData)
  postss.save().then(createdPost=>{
      res.status(201).json({
        message : "save success",
        post : {
          id: createdPost._id,
          // title:createdPost.title,
          // content:createdPost.content,
          // imagePath:createdPost.imagePath 
          ...createdPost
        }
    })
  //console.log("in post",postss)    
  console.log('post',postss.title)
  
  }).catch(error=>{
    res.status(500).json({
      message:"Post Creaion Failed!"
    })
  })
  }


exports.updatePost = (req,res,next)=>{
      let imagePath= req.body.imagePath;
      if(req.file){
        const url = req.protocol+ '://' + req.get('host');
        imagePath= url + "/images/" + req.file.filename
      }
      const post=new Posts({
        _id:req.body.id,
        title:req.body.title,
        content:req.body.content,
        imagePath:imagePath,
        creator:req.userData.userId
      })
      Posts.updateOne({_id:req.params.id, creator:req.userData.userId},post).then(result=>{
        console.log("updated success")

        if(result.n > 0){
          res.status(200).json({
            message : "updated success"
          })
        }else{
            res.status(401).json({
              message : "unauthorized"
            })
          }
      }).catch(error=>{
        res.status(500).json({
          message:"Post Updation Failed!"
        })
      })
    }


exports.getPosts = (req,res,next)=>{
    Posts.findById(req.params.id).then(post=>{
        if(post){
            res.status(200).json(post);
        }else{
            res.status(404).json({message:'post not found'})
        }
    })

}

exports.deletePost = (req,res,next)=>{
    console.log("delete id",req.params.id)
    
    Posts.deleteOne({ _id: req.params.id ,creator:req.userData.userId}, (err, task) => {
      console.log("remove===",task)
      if(task.n > 0){
        res.status(200).json({
          message : "delete success"
        })
      }else{
          res.status(401).json({
            message : "unauthorized deletion"
          })
        }
      })
    
    }