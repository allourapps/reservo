/* @flow */

import React, { Component } from 'react';
import _ from 'lodash';

import Divider from 'atoms/divider';
import Text from 'atoms/text';

import { Row, Col } from 'molecules/grid';

import './styles.scss';

type IHeaderProps = {
    title: String | any,
};

export default class Header extends Component<*, IHeaderProps, *> {
    render() {
        const { props } = this;
        const { title, children, className } = props;
        return (
            <Col
                className={`header ${className ? className : ''}`}
                {..._.omit(props, [ 'title', 'children', 'className' ])}
            >
                <Row bottom="xs" style={{ paddingBottom: '1rem', alignItems: 'center' }}>
                    <Col>
                        {typeof title !== 'string' ? title :
                            (<Text headline className="singleLine truncate" children={title}/>)
                        }
                    </Col>
                    {children ? <Col xs>{children}</Col> : null}
                </Row>
                <Divider inset/>
            </Col>
        );
    }
};