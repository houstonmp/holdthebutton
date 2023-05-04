import './Modal.css';

const Modal = (props) => {
    const closeModalHandler = () => {
        props.onCloseModal();
    }

    let maxArray = []

    if (props.userScores) {
        const getNumber = t => +t.replace(/[:,]/g, '')
        maxArray = props.userScores.sort(({ time: a }, { time: b }) => {
            return getNumber(b) - getNumber(a);
        }).slice(0, 5);
    }

    return (
        <>
            <section className="modal-background" onClick={closeModalHandler}>
                <article className="modal-body">
                    <h1 className="modal-header">Leader Board</h1>
                    {props.currentScore && <h3 className="currentTime">Your time: {props.currentScore}</h3>}
                    <ol>
                        {maxArray ? maxArray.map((el, index) => {
                            return (<li key={el + index}>{index + 1}.
                                <span key="0">{el.name}</span>
                                <span key="1">{el.time}</span>
                            </li>);
                        }) : "No high scores yet!"}
                    </ol>
                    <i className="center">Click anywhere to exit</i>
                </article>
            </section>
        </>
    );
}

export default Modal;