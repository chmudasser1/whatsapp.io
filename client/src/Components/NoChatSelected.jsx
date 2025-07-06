import { FiMessageSquare } from "react-icons/fi";
const NoChatSelected = () => {
    return (
        <div className="hidden w-full md:flex flex-1 flex-col items-center justify-center p-16 bg-base-100/50 h-screen">
            <div className="max-w-md text-center space-y-6">
                {/* Icon Display */}
                <div className="flex justify-center gap-4 mb-4">
                    <div className="relative">
                        <div
                            className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center
             justify-center animate-bounce"
                        >
                            <FiMessageSquare className="w-12 h-12 text-primary text-white text-3xl" />                        </div>
                    </div>
                </div>

                {/* Welcome Text */}
                <h2 className="text-2xl font-bold text-white">Welcome to Chatty!</h2>
                <p className="text-base-content/60 text-white">
                    Select a conversation from the sidebar to start chatting
                </p>
            </div>
        </div>
    );
};

export default NoChatSelected;