import React from 'react'
import { Link } from 'react-router'
import sortBy from 'lodash/sortBy'
import moment from 'moment'
import DocumentTitle from 'react-document-title'
import { prefixLink } from 'gatsby-helpers'
import access from 'safe-access'
import { config } from 'config'
import SitePost from '../components/SitePost'
import SiteSidebar from '../components/SiteSidebar'

class SiteIndex extends React.Component {
    componentWillMount() {
    }

    render() {
        const pageLinks = []
        let iteratorKey = 0
        // Sort pages.
        const sortedPages = sortBy(this.props.route.pages, (page) => access(page, 'data.date')
        ).reverse()
        sortedPages.forEach((page) => {
            iteratorKey += 1;
            if (access(page, 'file.ext') === 'md' && access(page, 'data.layout') === 'post' && access(page, 'data.written') != '') {
                const title = access(page, 'data.title') || page.path
                const description = access(page, 'data.description')
                const datePublished = access(page, 'data.written')
                const category = access(page, 'data.category')

                pageLinks.push(
                  <div className='container is-fluid' key={iteratorKey}>
                    <div className='box'>
                      <div className='card-header'>
                        <h2><Link style={ {    borderBottom: 'none',} } to={ prefixLink(page.path) } > { title } </Link></h2>
                        <time dateTime={ moment(datePublished).format('MMMM D, YYYY') }>
                          { moment(datePublished).format('MMMM YYYY') }
                        </time>
                        <span style={ {padding: '5px'} }></span>
                        <span className='blog-category'>{ category }</span>
                      </div>
                      <p dangerouslySetInnerHTML={ {    __html: description} } />
                      <Link className='readmore' to={ prefixLink(page.path) }> Read
                      </Link>
                    </div>
                  </div>
                )
            } else if (access(page, 'file.ext') === 'js' && access(page, 'data.written') != '') {
                const title = access(page, 'data.title') || page.path
                const description = access(page, 'data.description')
                const datePublished = access(page, 'data.written')
                const category = access(page, 'data.category')

                pageLinks.push(
                  <div className='container is-fluid' key={iteratorKey}>
                    <div className='box'>
                      <div className='card-header'>
                        <h2><Link style={ {    borderBottom: 'none',} } to={ prefixLink(page.path) } > { title } </Link></h2>
                        <time dateTime={ moment(datePublished).format('MMMM D, YYYY') }>
                          { moment(datePublished).format('MMMM YYYY') }
                        </time>
                        <span style={ {padding: '5px'} }></span>
                        <span className='blog-category'>{ category }</span>
                      </div>
                      <p dangerouslySetInnerHTML={ {    __html: description} } />
                      <Link className='readmore' to={ prefixLink(page.path) }> Read
                      </Link>
                    </div>
                  </div>
                )
            }
        })

        return (
            <DocumentTitle title={ config.siteTitle }>
              <div className='columns'>
                <div className='column is-narrow'>
                  <div className='container is-fluid'>
                    <SiteSidebar {...this.props}/>
                  </div>
                </div>
                <div className='column'>
                  { pageLinks }
                </div>
              </div>
            </DocumentTitle>
        )
    }
}

SiteIndex.propTypes = {
    route: React.PropTypes.object,
}

export default SiteIndex