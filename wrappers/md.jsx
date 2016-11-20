import React from 'react'
import DocumentTitle from 'react-document-title'
import SitePost from '../components/SitePost'
import SitePage from '../components/SitePage'
import SitePagejs from '../components/SitePagejs'
import { config } from 'config'

class MarkdownWrapper extends React.Component {
    render() {
        const {route} = this.props
        const post = route.page.data
        let layout, template

        layout = post.layout

        if (layout === 'page') {
            console.log('here1');
            template = <SitePage {...this.props}/>
        } else if (layout === 'post') {
            console.log('here2');
            template = <SitePost {...this.props}/>
        }

        return (
            <DocumentTitle title={ `${post.title} - ${config.siteTitle}` }>
              <div>
                { template }
              </div>
            </DocumentTitle>
            );
    }
}

MarkdownWrapper.propTypes = {
    route: React.PropTypes.object,
}

export default MarkdownWrapper