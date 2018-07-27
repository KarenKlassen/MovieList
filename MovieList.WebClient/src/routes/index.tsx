import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import Movie from './Movie/containers/MovieContainer';
import Comments from './Comment/containers/CommentPageContainer';

class Routes extends React.Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact={true} path='/' component={Movie} />
                    <Route path='/:movieid' component={Comments} />
                </Switch>
            </div>
        );
    }
}

export default Routes;