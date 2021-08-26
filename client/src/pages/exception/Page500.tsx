import React from 'react';
import {exceptionTemplate} from './exceptionTemplate'

const Page404: React.FC = () => {
    const ExceptionComponent = exceptionTemplate('500', '500', 'Sorry, something went wrong.')

    return (
        <ExceptionComponent/>
    );
};

export default Page404;
