import React from 'react';

function AllChecked({ logUser, allComplete, allDelete }) {

    return (
        <>
            <div className='text-end'>
                <button type='button'
                    className='btn btn-success me-2'
                    disabled={!logUser}
                    onClick={allComplete}
                >일괄 완료</button>
                <button type='button'
                    className='btn btn-danger'
                    disabled={!logUser}
                    onClick={allDelete}
                >일괄 삭제</button>
            </div>
        </>
    );
}

export default AllChecked;