import React from 'react'

const Museum = () => {
  return (
    <div className="cardArea combineW flex jcac">
        <div className="insideArea relative combineW flex jcac">
          <p className="inside bgImage flex"></p>
          <div className="lasers absolute combineW combineH flex">
            {laserArray.map((laser, index) => {
              return (
                <p key={index}>
                  {laser}
                </p>
              );
            })}
          </div>
        </div>
        <div className="tableArea relative combineW flex jcac">
          {tableParts.map((table, index) => {
            return (
              <p
                className="combineW combineH bRadius relative flex jcac"
                key={index}>
                {table}
                {index === 1 && (
                  <span className="combineW combineH bgImage absolute"></span>
                )}
              </p>
            );
          })}
        </div>
      </div>
  )
}

export default Museum