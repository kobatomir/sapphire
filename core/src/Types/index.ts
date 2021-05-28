/**  Action */
export type Action= ()=>void;
/** Func<T> */
export type Func<T>= ()=> T;

/** 谓词过滤 bool Predicate<in T>(T obj) */
export type Predicate<T> = (t:T)=>boolean;

/** Action<T> */
export type ActionT<T> = (t:T)=>void;

/** Action<T> */
export type FuncT<T,TOut> = (t:T)=>TOut;

export type ErrorAction= (e: Error) => any;