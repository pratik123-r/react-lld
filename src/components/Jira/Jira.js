import { useRef, useState } from "react"
import "./Jira.css"


const tasks = [
    {
        id: 1,
        cardName: 'asdf',
        task: [
            {
                id: 2,
                taskName: 'raj'
            },
            {
                id: 3,
                taskName: 'pratik'
            }
        ]
    },
    {
        id: 4,
        cardName: 'ldhbsd',
        task: [
            {
                id: 5,
                taskName: 'parth'
            },
            {
                id: 6,
                taskName: 'ravi'
            },
            {
                id: 7,
                taskName: 'manish'
            }
        ]
    },
    {
        id: 8,
        cardName: 'chbdsj',
        task: [
            {
                id: 9,
                taskName: 'vinu'
            },
            {
                id: 10,
                taskName: 'shreya'
            }
        ]
    },

]


function Jira() {
    const [cards, setCards] = useState(tasks)
    const dragInfo = useRef({
        sourceCardId: null,
        sourceTaskId: null
    })

    function onAddTask(taskName, cardId) {
       const newTask = {
            id: new Date().getTime(),
            taskName
        }

        const updatedCards = cards.map((card) => 
            card.id === cardId 
                ? { ...card, task: [...card.task, newTask] } 
                : card
        );

        setCards(updatedCards);
    }
    function handleDragStart(e, cardId, taskId) {
        dragInfo.current = {
            sourceCardId: cardId,
            sourceTaskId: taskId
        }        
    }
    function handleOnDrop(targetCardId) {
        const { sourceCardId, sourceTaskId } = dragInfo.current
        
        if(targetCardId === sourceCardId) return
        
        const updateCards = [...cards]

        let targetCardIndex;
        let sourceCardIndex;
        let sourceTaskIndex;

        for (let i = 0; i < updateCards.length; i++) {
                if(updateCards[i].id === sourceCardId) {
                    sourceCardIndex = i
                    sourceTaskIndex = updateCards[i].task.findIndex((data) => data.id === sourceTaskId)
                }
                if(updateCards[i].id === targetCardId) {
                    targetCardIndex = i
                }
        }

        updateCards[targetCardIndex].task.splice(updateCards[targetCardIndex].task.length, 0, updateCards[sourceCardIndex].task[sourceTaskIndex])
        updateCards[sourceCardIndex].task.splice(sourceTaskIndex, 1)
        setCards(updateCards)
        dragInfo.current = {
            sourceCardId: null,
            sourceTaskId: null
        }
    }
    function handleDragOver(e) {
        e.preventDefault();
    }
    return (
        <>
            <div className="jira-card-container">
                {cards.map((data) => (<Card handleOnDrop={handleOnDrop} handleDragOver={handleDragOver} handleDragStart={handleDragStart} onAddTask={(taskName) => onAddTask(taskName, data.id)} key={data.id} {...data}></Card>))}
            </div>

        </>
    )
}


//onDragStart
//onDragOver
//onDrop
function Card(props) {
    const { cardName, id, task, onAddTask, handleDragStart, handleOnDrop, handleDragOver } = props
    const inputRef = useRef('')
    return (
        <>
            <div onDragOver={handleDragOver} onDrop={()=> handleOnDrop(id)} className="jira-card">
                {cardName}
                {task.map((data) => (<Task handleDragStart={(e, cardId, taskId) => handleDragStart(e, cardId, taskId)} cardId={id} key={data.id} {...data}></Task>))}
                <input ref={inputRef} style={{ marginTop: '20px' }} type="text" />
                <button
                    onClick={() => { onAddTask(inputRef.current.value); inputRef.current.value = '' }}
                    style={{ marginTop: '20px' }}
                >
                    Add Task
                </button>
            </div>
        </>
    )
}

function Task(props) {
    const { taskName, cardId, id, handleDragStart } = props
    return (
        <>
            <div onDragStart={(e) => handleDragStart(e, cardId, id)}  draggable className="jira-task">
                {taskName}
            </div>

        </>
    )
}

export default function JiraConfig() {

    return (
        <>
            <Jira></Jira>
        </>
    )
}


