'use client';

type LoadMoreBtnPropsType = {
    functionProps?: any,
    textProps: string
}

export const LoadMoreBtn = ({functionProps, textProps}: LoadMoreBtnPropsType) => {

    return(
        <>
            <button onClick={functionProps} className="loadMoreBtn">{textProps}</button>
        </>
    )
}
