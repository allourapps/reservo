import React from 'react';
import Button from 'atoms/button';
import Panel from 'molecules/panel';
import { Row, Col } from 'molecules/grid';

const Demo = () => (
    <fb className="marginTop marginBottom">
        <Panel title="Flat Buttons" className="marginBottom">
            <Row>
                <Col><Button type="flat" onClick={() => {}} label="Flat Button" primary={true}/></Col>
                <Col><Button type="flat" onClick={() => {}} label="Flat Button" secondary={true}/></Col>
                <Col><Button type="flat" onClick={() => {}} label="Flat Button" icon="alert"/></Col>
            </Row>
        </Panel>
        <Panel title="Raised Buttons">
            <Row>
                <Col><Button onClick={() => {}} label="Raised Button" primary={true}/></Col>
                <Col><Button onClick={() => {}} label="Raised Button" secondary={true}/></Col>
                <Col><Button onClick={() => {}} label="Raised Button" icon="alert"/></Col>
            </Row>
        </Panel>
    </fb>
);

export { Demo };
