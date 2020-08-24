import React, {Component} from 'react';
import {
    Pagination,
    PaginationItem,
    PaginationLink
} from "reactstrap";
import Thread from "./Thread";


let prev = 0;
let next = 0;
let last = 0;
let first = 0;

class ThreadsPagination extends Component {
    constructor(props) {
        super(props);
        this.state = {
            threads: props.threads,
            currentPage: 1,
            threadsPerPage: 10,

        };
        this.handleClick = this.handleClick.bind(this);
        this.handleLastClick = this.handleLastClick.bind(this);
        this.handleFirstClick = this.handleFirstClick.bind(this);
    }

    componentDidUpdate(prevProps) {
        if(this.props.threads !== prevProps.threads){
            this.setState({
                ...this.state,
                threads: this.props.threads
            });
        }
    }

    handleClick(event) {
        event.preventDefault();
        this.setState({
            currentPage: Number(event.target.id)
        });
    }

    handleLastClick(event) {
        event.preventDefault();
        this.setState({
            currentPage: last
        });
    }

    handleFirstClick(event) {
        event.preventDefault();
        this.setState({
            currentPage: 1
        });
    }

    render() {
        let {threads, currentPage, threadsPerPage} = this.state;

        // Logic for displaying current replies
        let indexOfLastThread = currentPage * threadsPerPage;
        let indexOfFirstThread = indexOfLastThread - threadsPerPage;
        let currentThreads = threads?.slice(indexOfFirstThread, indexOfLastThread);
        prev = currentPage > 0 ? (currentPage - 1) : 0;
        last = Math.ceil(threads?.length / threadsPerPage);
        next = (last === currentPage) ? currentPage : currentPage + 1;

        // Logic for displaying page numbers
        let pageNumbers = [];
        for (let i = 1; i <= last; i++) {
            pageNumbers.push(i);
        }

        return (
            <div>
                <div>
                    {
                        currentThreads?.map(thread=>{
                            return (
                                <Thread thread={thread} key={thread.id} />
                            )
                        })
                    }
                </div>
                {
                    threads.length > threadsPerPage &&
                    <ul id="page-numbers">
                        <nav>
                            <Pagination>
                                <PaginationItem>
                                    {prev === 0 ? <PaginationLink disabled>First</PaginationLink> :
                                        <PaginationLink onClick={this.handleFirstClick} id={prev}
                                                        href={prev}>First</PaginationLink>
                                    }
                                </PaginationItem>
                                <PaginationItem>
                                    {prev === 0 ? <PaginationLink disabled>Prev</PaginationLink> :
                                        <PaginationLink onClick={this.handleClick} id={prev}
                                                        href={prev}>Prev</PaginationLink>
                                    }
                                </PaginationItem>
                                {
                                    pageNumbers.map((number, i) =>
                                        <Pagination key={i}>
                                            <PaginationItem
                                                active={pageNumbers[currentPage - 1] === (number) ? true : false}>
                                                <PaginationLink onClick={this.handleClick} href={number} key={number}
                                                                id={number}>
                                                    {number}
                                                </PaginationLink>
                                            </PaginationItem>
                                        </Pagination>
                                    )}

                                <PaginationItem>
                                    {
                                        currentPage === last ? <PaginationLink disabled>Next</PaginationLink> :
                                            <PaginationLink onClick={this.handleClick} id={pageNumbers[currentPage]}
                                                            href={pageNumbers[currentPage]}>Next</PaginationLink>
                                    }
                                </PaginationItem>

                                <PaginationItem>
                                    {
                                        currentPage === last ? <PaginationLink disabled>Last</PaginationLink> :
                                            <PaginationLink onClick={this.handleLastClick} id={pageNumbers[currentPage]}
                                                            href={pageNumbers[currentPage]}>Last</PaginationLink>
                                    }
                                </PaginationItem>
                            </Pagination>
                        </nav>
                    </ul>
                }
            </div>
        );
    }
}

export default ThreadsPagination;
