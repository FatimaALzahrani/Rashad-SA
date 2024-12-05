import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';
import Link from '@docusaurus/Link';

const FeatureList = [
  {
    title: 'Web SDK',
    Svg: require('../../static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Understand how to install and intergrate a Digital Person into your website or application.
      </>
    ),
    link: '/web-sdk/'
  },
  {
    title: 'Academy',
    Svg: require('../../static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Learn best practices through on-demand coaching to help you create an astonishing Digital Person.
      </>
    ),
    link: 'https://soulmachinesacademy.thinkific.com/'
  },
];

function Feature({Svg, title, description, link}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
         <Link
          to={link}>
          Get started
        </Link>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
