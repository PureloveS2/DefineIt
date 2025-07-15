'use client';

import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { DotPulse } from 'ldrs/react'
import 'ldrs/react/DotPulse.css'

export default function Home() {   
  type definitions = {
    definition: string | undefined,
    example: string | undefined,
  };

  const [word, setWord] = useState('');
  const [isFetching, setIsFetching] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);
  const [currentWord, setCurrentWord] = useState('');
  const [definitions, setDefinitions] = useState<definitions[]>([
    {
      definition: undefined,
      example: undefined,
    }
  ]);

  const getWord = async () => {
    event?.preventDefault();
    setIsFetching(true);
    
    try {
      setWord("")
      const response = await fetch (`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      const data = await response.json();
      
      setCurrentWord(data[0].word)
      setIsNotFound(false);
      console.log(data[0].meanings)
      setDefinitions(data[0].meanings[0].definitions);
      
    } catch(err) {
        setIsNotFound(true);
        console.log(err);
    } finally {
        setIsFetching(false);
    };    
  };
  
  return (
    <main className="flex flex-col h-screen items-center justify-center">
      <div className="flex flex-col bg-blue-800/10 w-[95%] lg:w-[60%] max-h-[90dvh] rounded-2xl p-2 shadow-2xl overflow-y-auto no-scrollbar">
        <form className="flex p-2 gap-2">
          <input type="text" placeholder="Search for a word" value={word} onChange={e => setWord(e.target.value)} className="w-full outline-0 border-b-2 border-blue-800/50 hover:border-blue-800/70 focus:border-blue-800/90 p-1 transition-all" />
          <button onClick={getWord} className="p-2 hover:bg-blue-800/50 active:bg-blue-800/70 rounded-full transition">
            <FaSearch />
          </button>
        </form>
        <div className={`${isFetching ? 'block' : 'hidden'} m-auto w-fit my-2`}>
          <DotPulse
            size="43"
            speed="1.3"
            color="blue" 
          />
        </div>
        <div>
          <p className={`${isNotFound ? 'block' : 'hidden'} m-auto w-fit text-red-500 my-2`}>Word not found</p>
        </div>
        <div className={`${isNotFound ? 'hidden' : 'block'}`}>
          
          <section className={`${definitions[0].definition ? 'block' : 'hidden'}`}>
            <h2 className="text-2xl font-semibold p-2 mt-2">{`Meaning of ${currentWord}`}</h2>
            <ul className="flex flex-col gap-2 p-4">
              {
                definitions?.map((value, index) => {
                  return <li key={index}>{value.definition}</li>
                })
              }
            </ul>
          </section>
          
          <section className={`${definitions[0].example ? 'block' : 'hidden'}`}>
            <h2 className={`text-2xl font-semibold p-2`}>Examples</h2>
            <ul className="flex flex-col gap-2 p-4">
              {
                definitions?.map((value, index) => {
                  return value.example ? <li key={index}>{`"${value.example}"`}</li>
                  : null
                })
              }
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
};
