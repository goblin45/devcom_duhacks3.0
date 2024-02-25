import { BehanceIconSvg, GitHubIconSvg } from '../../../assets/ForHackathonCard'
import './chatHeader.css'

const ChatHeader = ({user}) => {
    return (
        <div className="chat-header absolute top-0 w-full h-16 px-5 flex justify-between items-center">
            <div className="flex justify-between items-center h-full w-fit gap-5">
                <img
                    className='h-12 w-12 rounded-full overflow-hidden'
                    src={user.dp}
                />
                <span className='text-2xl'>
                    {user.user}
                </span>
            </div> 
            <div className="flex justify-between items-center h-full w-fit gap-5">
                <span className='folio-icons h-10 w-10 bg- flex justify-center items-center rounded-full'>
                    <GitHubIconSvg/>
                </span>
                <span className='folio-icons h-10 w-10 bg- flex justify-center items-center rounded-full'>
                    <BehanceIconSvg/>
                </span>
            </div>
        </div>
    )
}

export default ChatHeader