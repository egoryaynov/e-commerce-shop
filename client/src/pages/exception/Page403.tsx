import React from 'react';
import {exceptionTemplate} from './exceptionTemplate'

const Page404: React.FC = () => {
    const ExceptionComponent = exceptionTemplate('403', '403', 'Sorry, you are not authorized to access this page.')

    return (
        <ExceptionComponent/>
    );
};

export default Page404;
