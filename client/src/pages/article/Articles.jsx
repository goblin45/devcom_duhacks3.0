import NavBar from '../../constants/NavBar'
import './articles.css'

import ArticlesBG from './ArticlesBG'

import { DummyArticlesArray } from '../../data/DummyArticles'
import {DummyUser} from '../../data/DummyUser'
import { ShareSvg } from '../../assets/ForArticle'

const Articles = () => {
    return (
        <div className='noscroll w-screen h-screen overflow-y-auto'>
            <ArticlesBG/>
            <NavBar currentPath={window.location.pathname}/>
            <div className="w-full h-full absolute pt-20 flex items-start justify-start gap-20 font-devcom z-0 overflow-y-auto">
                <div className="w-full h-full flex gap-10 p-12">
                    <div className="w-2/3 h-full flex flex-col justify-start gap-10">
                    {
                        DummyArticlesArray.map((article, index) => {
                            return (
                                    <a href={article.link} target="_blank" rel="noopener noreferrer"className='article-card w-full h-36 backdrop-blur-xl p-5 flex gap-5 text-white' key={index}>
                                        <img 
                                            className='w-5/5 h-full'
                                            src={article.photo}
                                            alt={article.title}
                                        />
                                    
                                        <div className="h-full flex flex-col justify-start">
                                            {article.title}                                        
                                            <p className="text-sm h-fit font-sans text-gray-400">
                                                {article.desc}
                                            </p>
                                        </div>
                                    </a>
                            )
                        })
                    }

                    </div>
                    <div className="w-1/3 h-fit flex flex-col justify-start p-5 gap-3 border border-custom-green">
                        <img 
                            className='h-40 w-full'
                            src={DummyArticlesArray[0].photo}
                        />
                        <span className='text-2xl text-white'>
                            {DummyArticlesArray[0].title}
                        </span>
                        <p className="text-gray-400 font-sans">
                            {DummyArticlesArray[0].desc}
                        </p>
                        <div className="flex justify-between items-center">
                            <div className="article-user-highlight w-fit h-12 flex justify-between items-center gap-3 pl-2 pr-5 rounded-3xl">
                                <img
                                    className='rounded-full w-10 h-10'
                                    src={DummyUser.dp}
                                />
                                <span className='text-white'>
                                    {DummyUser.name}
                                </span>
                            </div>
                            <div className="article-user-highlight w-12 h-12 flex justify-center items-center rounded-full">
                                <ShareSvg/>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default Articles