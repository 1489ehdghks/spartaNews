import React from 'react';

const MarqueePage = () => {
    return (
        <div>
            <marquee behavior="scroll" direction="left">I'm a marquee. I'm scrolling text.</marquee>
            <marquee behavior="scroll" direction="left" scrollamount="1">I'm slowest!</marquee>
            <marquee behavior="scroll" direction="left" scrollamount="2">I'm slow!</marquee>
            <marquee behavior="scroll" direction="left" scrollamount="10">I'm fast!</marquee>
            <marquee behavior="scroll" direction="left" scrollamount="12">I'm faster!</marquee>
            <marquee behavior="scroll" direction="left" scrollamount="20">I'm fastest!</marquee>
            <marquee behavior="scroll" direction="left" scrollamount="100">I'M FASTEST!!!</marquee>
            <marquee behavior="scroll" direction="left" scrollamount="5">
                <marquee behavior="scroll" direction="left" scrollamount="5">
                    now you see me, now you don't.
                </marquee>
            </marquee>
            <marquee behavior="scroll" direction="down" scrollamount="5">Down down down down down down down!</marquee>
        </div>
    );
};

export default MarqueePage;
