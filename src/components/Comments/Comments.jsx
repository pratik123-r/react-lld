import { useRef, useState } from "react"
import "./Comments.css"


const commentState = [{
    id: 1,
    name: "aa",
    chid: [
        {
            id: 2,
            name: "bb",
            chid: []
        }
    ]
}]

function Comments({ comment, addCommentChild }) {

    const commentInput = useRef("")

    return (
        <div className="comment">
            <div className="comment-txt">
                {comment.name}
            </div>
            <div className="add-comment">
                <input ref={commentInput} type="text" />
                <button onClick={() => {
                    addCommentChild(comment.id, commentInput.current.value);
                    commentInput.current.value = ""
                }
                }> add </button>
            </div>

            {comment && comment.chid && comment.chid.length > 0 && comment.chid.map((data) =>
                <Comments comment={data} addCommentChild={addCommentChild}> </Comments>
            )}
        </div>
    )
}


export default function CommentsConfig() {
    const [comment, setComment] = useState(commentState)
    const commentInput = useRef("")

    function addCommentChild(parentId, text) {
        if(!text)
            return
        let childCommentId = new Date().getTime()
        const updatedComment = [...comment]
        addCommmentById(parentId, childCommentId, updatedComment, text)
        setComment(updatedComment)
    }

    function addCommmentById(parentId, childCommentId, updatedComment, comment) {
        for (let index = 0; index < updatedComment.length; index++) {
            if (updatedComment[index].id === parentId) {
                updatedComment[index].chid.push({
                    id: childCommentId,
                    name: comment,
                    chid : []
                })
                return
            }
            addCommmentById(parentId, childCommentId, updatedComment[index].chid, comment)
        }
    }


    function addCommentRoot(text) {
        let commentId = new Date().getTime()
        const updatedComment = [...comment]
        updatedComment.push({
            id: commentId,
            name: text,
            chid: []

        })
        setComment(updatedComment)
    }






    return (<>
        <div className="container">
            {comment.map((data) => {
                return <Comments addCommentChild={addCommentChild} comment={data}> </Comments>
            })}
        </div>

        <div className="add-comment">
            <input ref={commentInput} type="text" />
            <button onClick={() => {
                addCommentRoot(commentInput.current.value);
                commentInput.current.value = ""
            }
            }> add </button>
        </div>
    </>)

}

