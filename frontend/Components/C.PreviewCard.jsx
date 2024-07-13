const PreviewCard = ({ name, price, symbol, logo, rating }) => {
    const cardStyle = {
        height: '250px',
        width: '400px',
        margin: '5px 5px 5px 5px',
        //box-shadow: '10px 10px 5px',
    }

    const checkBoxStyle = {
        height: '15px',
        width: '15px',
        cursor: 'pointer',
    }

    const handleClick = () => {
    }

    const [text, setText] = useState('');

    const handleSelect = (event) => {
        event.stopPropagation();
        setText(text === '' ? <>&#x2713;</> : '');
    }


    return (

        <div className='previewCard' onClick={handleClick}>
            <button style={checkBoxStyle} onClick={handleSelect}> {text} </button>
            <h3>{name}</h3>
            <img src={logo} />
            <div className="ActivePrice">{price}</div>
            <div className="Rating">{rating}</div>

        </div>
    )
}


export default PreviewCard;