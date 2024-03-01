import '../css/Card.css';
import insurance from '../assets/insurance.svg';
import download from '../assets/download.svg';

interface Cardprops {
    key: number;
    name: string;
    id: string;
    validTill: string;
}

const Card: React.FC<Cardprops> = ({ key, name, id, validTill, }) => {

    const handleClick = () => {
        const card = document.getElementsByClassName('card-container');
        console.log(card);
        if (card) {
            window.print();
        }
    }

    return (
        <div className='card-container'>
            <div className='card-section1'>
                <img src={insurance} alt='Insurance' width="45" height="100"></img>
            </div>
            <div className='card-section2'>
                <div className='card-section2-div1'>
                    <div className='card-details'>
                        <div className='card-details-name'>
                            <p className='card-details-label'>Name</p>
                            <p className='card-details-value'>{name}</p>
                        </div>
                        <div className='card-details-id'>
                            <p className='card-details-label'>ID</p>
                            <p className='card-details-value'>{id}</p>
                        </div>
                    </div>
                    <div className='card-details'>
                        <div className='card-details-age'>
                            <p className='card-details-label'>Age</p>
                            <p className='card-details-value'>55 - Male</p>
                        </div>
                        <div className='card-details-valid'>
                            <p className='card-details-label'>Valid till</p>
                            <p className='card-details-value'>{validTill}</p>
                        </div>
                    </div>
                </div>
                <div className='card-section2-div2'>
                    <p className='card-details-label'>For claims, contact:<span className='card-details-value'>1800 200 3040</span></p>
                    <img src={download} alt='Download' onClick={handleClick} />
                </div>
            </div>
        </div>
    )
}

export default Card
