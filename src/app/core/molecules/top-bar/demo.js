import React from 'react';
import TopBar, { UtilityBar } from 'molecules/top-bar';
import Txt from 'atoms/text';
import IconButton from 'atoms/iconButton';
import Avatar from 'atoms/avatar';

const Demo = () => {
    const fakeRootRoute = {
        name: '', path: '/', component: null, childRoutes: [
            { name: 'Dashboard', path: 'page-1' },
            { name: 'Inspections & Audits', path: 'page-2' },
            { name: 'Planning', path: 'page-3' },
            { name: 'Templates', path: 'page-3' },
        ]
    };

    const fakeRoutesArrayWithActivePage = [
        fakeRootRoute,
        { name: 'Page 1', path: 'page-1', component: null, childRoutes: [
            { name: 'My Vessels', path: 'ChildRoute-1' },
            { name: 'All Vessels', path: 'ChildRoute-2' },
        ]},
    ];

    return (
        <fb className="marginTop marginBottom">
            <TopBar
                routes={fakeRoutesArrayWithActivePage}
                leftComp={(
                    <fb style={{ justifyContent: 'center', paddingLeft: '2rem' }}>
                        <Txt xlarge color="white" fontWeight={300}><span style={{ fontStyle: 'italic', fontWeight: 600 }}>cfm</span> LSG</Txt>
                    </fb>
                )}
                rightComp={(
                    <UtilityBar>
                        <IconButton name="cut" iconStyle={{ color: 'white' }} onClick={() => {}} size="medium" />
                        <IconButton name="cut" iconStyle={{ color: 'white' }} onClick={() => {}} size="medium" />
                        <fb style={{ padding: '0 1rem' }} ><Avatar style={{ zIndex: 99999 }} isPerson={true} path="https://pbs.twimg.com/profile_images/729890553416982529/lJbccgRf.jpg" /></fb>
                    </UtilityBar>
                )}
            />
        </fb>
    );
};

export { Demo };
