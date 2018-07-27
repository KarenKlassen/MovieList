import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from '../routes/index';

export interface ICoreLayoutProps {
}

export interface IState {
    isVisible: boolean;
}

class CoreLayout extends React.Component<ICoreLayoutProps, IState> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <BrowserRouter>
                {/* I don't think that I need all of these divs but I'm not sure */}
                <div className="core-layout__viewport" style={{ margin: 0, padding: 0, height: '100%' }}>
                    <div className="layoutMain">
                        <div className="layoutRoutes">
                            <Routes />
                        </div>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

export default CoreLayout;