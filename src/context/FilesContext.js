import axios from "axios";
import React, { createContext, useCallback, useEffect, useRef, useState } from "react";

const FileContext = createContext();

export const FileReducer = ({ children }) => {
  const [path, setPath] = useState('')
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const fordwardRoute = useRef();

  useEffect(() => {
    setLoading(true);
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/folder/?path=${path}`)
      .then(res => {
        let folders = res.data.data.filter(e => !e.includes('.txt'))
        let files = res.data.data.filter(e => e.includes('.txt'))
        setFiles([...folders, ...files]);
        if (!fordwardRoute.current?.includes(path))
          fordwardRoute.current = undefined;
      })
      .catch(e => alert(e.response.data.error))
      .finally(() => setLoading(false));
  }, [path])

  const removeFile = useCallback((path) => {
    setFiles(prev => prev.filter(e => e !== path));
  }, [])

  const reload = (path) => {
    let p = path.split('/');
    let pa = p.slice(0, p.length - 1).join('/')
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/folder/?path=${pa}`)
      .then(res => {
        let folders = res.data.data.filter(e => !e.includes('.txt'))
        let files = res.data.data.filter(e => e.includes('.txt'))
        setFiles([...folders, ...files]);
      })
      .catch(console.log)
  }

  const goBack = () => {
    const dirs = path.split('/');
    if (dirs.length < 1) return;
    fordwardRoute.current = path;
    setPath(dirs.slice(0, dirs.length - 1).join('/'))
  }

  const goFordward = () => {
    if (fordwardRoute.current === undefined)
      return;
    setPath(fordwardRoute.current)
    fordwardRoute.current = undefined;
  }

  const deleteItem = (path) => {
    let isTextFile = path.includes('.txt');
    axios.delete(`${process.env.REACT_APP_BACKEND_URL}/${isTextFile ? 'file' : 'folder'}/?path=${path}`)
      .then(res => {
        setFiles(prev => prev.filter(e => e !== path.split('/').pop()));
      })
      .catch((e) => alert(e.data.error))
  }

  const searchFolder = e => {
    setPath(`${path === '' ? '' : path + '/'}${e}`);
  }

  return (
    <FileContext.Provider value={{ files, loading, path, fordwardRoute, reload, searchFolder, removeFile, goBack, goFordward, deleteItem }}>
      {children}
    </FileContext.Provider>
  )
}

export default FileContext