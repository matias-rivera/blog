import './style.css'

const Maintenance = () => {
    return (
        <>
            <div className='maintenance'>
                <i class="fas fa-tools maintenace__icon"></i>
                <h2 className='maintenance__title'>Sorry, we're down for maintenance.</h2>
                <h6 className='maintenance__subtitle'>We'll be back shortly.</h6>
            </div>
        </>
    )
}

export default Maintenance