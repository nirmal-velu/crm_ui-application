import Card from "../Card";
import '../../css/Card.css'

const HealthCard = () => {

    const policies = [
        { name: 'Name 1', id: '1234567890', validTill: '01-Apr-2024', instype: 'health' },
        // { name: 'Name 2', id: '0987654321', validTill: '02-Feb-2024', instype: 'health' },
        // { name: 'Name 3', id: '1111111111', validTill: '21-Jul-2024', instype: '' },
        // { name: 'Name 4', id: '2222222222', validTill: '10-Aug-2024', instype: 'health' }
    ];

    return (
        <div className="cards ms-4 mt-4">
            {policies.map((policy, index) => (
                policy.instype === 'health' ? (
                    <Card
                        key={index}
                        name={policy.name}
                        id={policy.id}
                        validTill={policy.validTill}
                    />
                ) : null
            ))}
        </div>
    )
}

export default HealthCard

