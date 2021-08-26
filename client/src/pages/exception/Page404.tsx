import React from 'react';
import {exceptionTemplate} from './exceptionTemplate'

const Page404: React.FC = () => {
    const ExceptionComponent = exceptionTemplate('404', '404', 'Sorry, the page you visited does not exist.')

    return (
        <ExceptionComponent/>
    );
};

export default Page404;
