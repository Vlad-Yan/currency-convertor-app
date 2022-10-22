import React from 'react';

const Date = ({lastupdate}) => {

    const date = lastupdate.substring(0, lastupdate.indexOf('T'));
    const time = lastupdate.substring(lastupdate.indexOf('T') + 1, lastupdate.indexOf('.'));
    const timeZone = lastupdate.substring(lastupdate.indexOf('+'))

    return (
        <div>
            <p>Данные за {date} {time} GMT{timeZone}</p>
        </div>
    );
};

export default Date;