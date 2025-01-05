import './Progress.css'

type Props = {}

const MyProgressBar = ({ }: Props) => {
    return (
        <div className='w-100 progress-bar-wrapper d-flex flex-column'>
            <div className='d-flex justify-content-between progress-label-container'>
                <label htmlFor="progress-bar" className='medium desktop-small'>12/15 sessions completed</label>
                <span className='semi-bold desktop-small'>85%</span>
            </div>
            <div className="progress bg-white">
                <div className="progress-bar" style={{ width: "85%" }}></div>
            </div>
        </div>
    )
}

export default MyProgressBar