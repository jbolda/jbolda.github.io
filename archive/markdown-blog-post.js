import React from 'react';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';
import moment from 'moment';
import siteMetadata from '../components/metadata.yaml';

class markdownBlogPostTemplate extends React.Component {
  render() {
      console.log(this)
      let data = this.props.data.markdownRemark;

      const home = (
        <div className='nav'>
          <div className='container'>
            <div className='nav-left'>
              <Link
                className='nav-item is-tab is-active'
                to={ '/' }>
                Home
              </Link>
            </div>
          </div>
        </div>
      );

      if (data.frontmatter.updated === null) {
        var published = (
          <div className='date-published'>
            <p><em>published { moment(data.frontmatter.written).format('D MMM YYYY') }</em></p>
          </div>
        );
      } else {
        var published = (
          <div className='date-published'>
            <p><em>originally published { moment(data.frontmatter.written).format('D MMM YYYY') } and
                    updated { moment(data.frontmatter.updated).format('D MMM YYYY') }</em></p>
          </div>
        );
      }

      return (
          <div className='ArticleTemplate'>
            <Helmet
              title={ data.frontmatter.title }
              meta={[
                { name: 'description', content: data.frontmatter.description },
                { property: 'og:url', content: ('https://www.jacobbolda.com/'+data.frontmatter.path) },
                { property: 'og:description', content: data.frontmatter.description },
                { property: 'og:type', content: 'article' },
                { property: 'og:article:author', content: 'Jacob Bolda' },
                { property: 'og:article:published_time', content: moment(data.frontmatter.written, 'YYYY-MM-DD') },
                { property: 'og:article:modified_time', content: moment(data.frontmatter.updated, 'YYYY-MM-DD') },
                { property: 'og:article:tag', content: data.frontmatter.category },
                { name: 'twitter:label1', content: 'Category' },
                { name: 'twitter:data1', content: data.frontmatter.category },
                { name: 'twitter:label2', content: 'Written' },
                { name: 'twitter:data2', content: data.frontmatter.written },
              ]}
            />
            { home }
            <div className='container'>
              <div className='markdown section'>
                <div className='container content'>
                  <h1>{data.frontmatter.title}</h1>
                  <div dangerouslySetInnerHTML={{ __html: data.html }} />
                </div>
              </div>
            </div>
            <div className='footer container'>
              { published }
              <hr />
              <p>
                { siteMetadata.siteDescr }
                <a href={ siteMetadata.siteTwitterUrl }>
                  <br></br> <strong>{ siteMetadata.siteAuthor }</strong> on Twitter</a>
              </p>
            </div>
          </div>
          );
  }
}

export default markdownBlogPostTemplate;

export const pageQuery = graphql`
    query markdownBlogPostBySlug($slug: String!) {
      markdownRemark(fields: { slug: { eq: $slug }}) {
        html
        timeToRead
        headings {
          value
          depth
        }
        frontmatter {
          title
          written
          category
          description
          updated
          what
        }
      }
    }
`