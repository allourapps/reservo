import React from 'react';
import Sidebar from 'molecules/sidebar';
import { Header, Content } from 'atoms/paper';

const Demo = () => (
    <fb className="marginTop marginBottom">
        <Sidebar>
            <Header title="Sidebar" />
            <Content>
                Make your window size smaller and have a look at the blue button on the left side of your screen :)
            </Content>
        </Sidebar>
    </fb>
);

export { Demo };
