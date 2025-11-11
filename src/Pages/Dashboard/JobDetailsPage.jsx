import { Link, useParams, useNavigate } from "react-router-dom";
import {
  useChangeJobStatusMutation,
  useDeleteJobPostMutation,
  useGetSingleJobPostQuery,
} from "../../redux/apiSlices/categorySlice";
import { Spin, message } from "antd";
import {
  ChevronLeft,
  Flag,
  Ban,
  Trash2,
  Clock,
  DollarSign,
  MapPin,
  Calendar,
  User,
  Briefcase,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
} from "lucide-react";
import { useState } from "react";
import { imageUrl } from "../../redux/api/baseApi";
import toast from "react-hot-toast";

const JobDetailsPage = () => {
  const { id } = useParams();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showFlagModal, setShowFlagModal] = useState(false);
  const [showBlockModal, setShowBlockModal] = useState(false);

  const { data: jobPost, isLoading, refetch } = useGetSingleJobPostQuery(id);
  const navigate = useNavigate();
  const [switchJobStatus, { isLoading: isSwitching }] =
    useChangeJobStatusMutation();
  const [deleteJobPost, { isLoading: isDeleting }] = useDeleteJobPostMutation();

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-[500px]">
        <Spin />
      </div>
    );

  const job = jobPost?.data || {};

  const getStatusConfig = () => {
    if (job.isBlocked) {
      return {
        label: "Blocked",
        icon: Ban,
        bg: "bg-red-500/10",
        border: "border-red-500",
        text: "text-red-600",
        iconColor: "text-red-500",
      };
    }
    if (job.isFlaggedAsInAppropriate) {
      return {
        label: "Flagged",
        icon: Flag,
        bg: "bg-orange-500/10",
        border: "border-orange-500",
        text: "text-orange-600",
        iconColor: "text-orange-500",
      };
    }
    if (job.isDeleted) {
      return {
        label: "Deleted",
        icon: Trash2,
        bg: "bg-gray-500/10",
        border: "border-gray-500",
        text: "text-gray-600",
        iconColor: "text-gray-500",
      };
    }
    if (job.isOnProject) {
      return {
        label: "In Progress",
        icon: Clock,
        bg: "bg-blue-500/10",
        border: "border-blue-500",
        text: "text-blue-600",
        iconColor: "text-blue-500",
      };
    }
    if (job.isOfferApproved && job.isPaid) {
      return {
        label: "Active & Paid",
        icon: CheckCircle,
        bg: "bg-green-500/10",
        border: "border-green-500",
        text: "text-green-600",
        iconColor: "text-green-500",
      };
    }
    return {
      label: "Active",
      icon: CheckCircle,
      bg: "bg-green-500/10",
      border: "border-green-500",
      text: "text-green-600",
      iconColor: "text-green-500",
    };
  };

  const statusConfig = getStatusConfig();
  const StatusIcon = statusConfig.icon;

  const handleSwitchStatus = async () => {
    try {
      const payload = {
        post_id: id,
        type: job.isBlocked ? "BLOCK" : "BLOCK",
      };
      const res = await switchJobStatus(payload).unwrap();
      if (res?.success) {
        toast.success(res.message || "Project blocked successfully");
      } else {
        toast.success(res.message || "Project activated successfully");
      }
      await refetch();
    } catch (err) {
      message.error(err?.data?.message || "Failed to update project status");
    }
  };

  const handleDeletePost = async () => {
    try {
      await deleteJobPost({ postID: id }).unwrap();
      message.success("Project deleted successfully");
      navigate("/jobs-list");
    } catch (err) {
      message.error(err?.data?.message || "Failed to delete project");
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const ActionModal = ({ show, onClose, title, message, onConfirm, type }) => {
    if (!show) return null;

    const typeColors = {
      flag: "bg-orange-500 hover:bg-orange-600",
      block: "bg-yellow-500 hover:bg-yellow-600",
      delete: "bg-red-500 hover:bg-red-600",
    };

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-scale-in">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600 mb-6">{message}</p>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className={`flex-1 px-4 py-2.5 text-white rounded-xl font-semibold transition-all ${typeColors[type]}`}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="min-h-screen bg-white p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <Link to="/jobs-list">
              <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-4 group">
                <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span className="font-medium">Back to Jobs</span>
              </button>
            </Link>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  {job.projectName || "Untitled Project"}
                </h1>
                <p className="text-gray-500">Job ID: {job._id}</p>
              </div>
            </div>
          </div>

          {/* Status Bar - Prominent Section */}
          <div
            className={`${statusConfig.bg} ${statusConfig.border} border-2 rounded-2xl p-6 mb-6 shadow-lg`}
          >
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div
                  className={`${statusConfig.bg} p-4 rounded-xl border-2 ${statusConfig.border}`}
                >
                  <StatusIcon className={`w-8 h-8 ${statusConfig.iconColor}`} />
                </div>
                <div>
                  <div className="text-sm text-gray-600 font-medium mb-1">
                    Current Status
                  </div>
                  <div className={`text-2xl font-bold ${statusConfig.text}`}>
                    {statusConfig.label}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => setShowBlockModal(true)}
                  className={`flex items-center gap-2 px-5 py-3 ${
                    job.isBlocked
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-orange-500 hover:bg-orange-600"
                  } text-white rounded-xl font-semibold transition-all hover:shadow-lg hover:-translate-y-0.5`}
                >
                  <Ban className="w-5 h-5" />
                  {job.isBlocked ? "Unblock" : "Block"} Project
                </button>
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="flex items-center gap-2 px-5 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold transition-all hover:shadow-lg hover:-translate-y-0.5"
                >
                  <Trash2 className="w-5 h-5" />
                  Delete
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-blue-500/10 rounded-lg">
                      <DollarSign className="w-6 h-6 text-blue-500" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Budget</div>
                      <div className="text-xl font-bold text-gray-900">
                        ${job.acceptedOffer?.budget || "N/A"}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-purple-500/10 rounded-lg">
                      <User className="w-6 h-6 text-purple-500" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Offers</div>
                      <div className="text-xl font-bold text-gray-900">
                        {job.offers || 0}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-green-500/10 rounded-lg">
                      <CheckCircle className="w-6 h-6 text-green-500" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Payment</div>
                      <div className="text-xl font-bold text-gray-900">
                        {job.isPaid ? "Paid" : "Unpaid"}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-orange-500/10 rounded-lg">
                      <Clock className="w-6 h-6 text-orange-500" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Status</div>
                      <div className="text-xl font-bold text-gray-900">
                        {job.isOnProject ? "Active" : "Pending"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Description
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {job.jobDescription || "No description available"}
                </p>
              </div>

              {/* Accepted Offer Details */}
              {job.acceptedOffer && (
                <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Accepted Offer
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {job.acceptedOffer.description}
                  </p>
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
                    <div>
                      <div className="text-sm text-gray-600">Offer Budget</div>
                      <div className="text-2xl font-bold text-green-600">
                        ${job.acceptedOffer.budget}
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">
                      Type:{" "}
                      <span className="font-semibold">
                        {job.acceptedOffer.typeOfOffer}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Showcase Images */}
              {job.showcaseImages && job.showcaseImages.length > 0 && (
                <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Project Images
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {job?.showcaseImages?.map((image, index) => (
                      <div
                        key={index}
                        className="relative aspect-square rounded-xl overflow-hidden hover:opacity-90 transition-opacity cursor-pointer"
                      >
                        <img
                          src={
                            image?.startsWith("http")
                              ? image
                              : `${imageUrl}${image}`
                          }
                          alt={`Showcase ${index + 1}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src =
                              "https://via.placeholder.com/300?text=Image";
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Job Info */}
              <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Job Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Briefcase className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <div className="text-sm text-gray-500">Category</div>
                      <div className="font-semibold text-gray-900">
                        {job.category || "N/A"}
                      </div>
                      <div className="text-sm text-gray-600">
                        {job.subCategory || ""}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <div className="text-sm text-gray-500">Location</div>
                      <div className="font-semibold text-gray-900">
                        {job.location || "N/A"}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <div className="text-sm text-gray-500">Posted Date</div>
                      <div className="font-semibold text-gray-900">
                        {formatDate(job.createdAt)}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <div className="text-sm text-gray-500">Deadline</div>
                      <div className="font-semibold text-gray-900">
                        {formatDate(job.deadline)}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <div className="text-sm text-gray-500">Commission</div>
                      <div className="font-semibold text-gray-900">
                        {job.adminCommissionPercentage || 0}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Customer Info */}
              <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Customer
                </h3>
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={
                      job?.createdBy?.profileImage?.startsWith("http")
                        ? job?.createdBy?.profileImage
                        : `${imageUrl}${job?.createdBy?.profileImage}`
                    }
                    alt={job?.createdBy?.fullName}
                    className="w-16 h-16 rounded-full object-cover"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/64?text=User";
                    }}
                  />
                  <div>
                    <div className="font-bold text-gray-900">
                      {job?.createdBy?.fullName || "N/A"}
                    </div>
                    <div className="text-sm text-gray-500">Customer</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">ID:</span>{" "}
                    {job?.createdBy?._id}
                  </div>
                  {job?.createdBy?.city && (
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">City:</span>{" "}
                      {job?.createdBy?.city}
                    </div>
                  )}
                  {job?.createdBy?.address && (
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Address:</span>{" "}
                      {job?.createdBy?.address}
                    </div>
                  )}
                </div>
              </div>

              {/* Assigned Provider */}
              {job?.acceptedOffer?.form && (
                <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Assigned Provider
                  </h3>
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={
                        job?.acceptedOffer?.form?.profileImage?.startsWith(
                          "http"
                        )
                          ? job?.acceptedOffer?.form?.profileImage
                          : `${imageUrl}${job?.acceptedOffer?.form?.profileImage}`
                      }
                      alt={job?.acceptedOffer?.form?.fullName}
                      className="w-16 h-16 rounded-full object-cover"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/64?text=Provider";
                      }}
                    />
                    <div>
                      <div className="font-bold text-gray-900">
                        {job?.acceptedOffer?.form?.fullName || "N/A"}
                      </div>
                      <div className="text-sm text-gray-500">
                        Service Provider
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">ID:</span>{" "}
                      {job?.acceptedOffer?.form?._id}
                    </div>
                  </div>
                </div>
              )}

              {/* Cover Image */}
              {job.coverImage && (
                <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Cover Image
                  </h3>
                  <div className="relative aspect-video rounded-xl overflow-hidden">
                    <img
                      src={
                        job?.coverImage?.startsWith("http")
                          ? job.coverImage
                          : `${imageUrl}${job.coverImage}`
                      }
                      alt="Cover"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/400x300?text=Cover+Image";
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modals */}
        <ActionModal
          show={showFlagModal}
          onClose={() => setShowFlagModal(false)}
          title="Flag Project"
          message="Are you sure you want to flag this project? This will mark it for review and notify the moderation team."
          onConfirm={() => console.log("Project flagged")}
          type="flag"
        />

        <ActionModal
          show={showBlockModal}
          onClose={() => setShowBlockModal(false)}
          title="Block Project"
          message="Are you sure you want to block this project? This will prevent any further activity and hide it from users."
          onConfirm={handleSwitchStatus}
          type="block"
        />

        <ActionModal
          show={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          title="Delete Project"
          message="Are you sure you want to permanently delete this project? This action cannot be undone."
          onConfirm={handleDeletePost}
          type="delete"
        />

        <style jsx>{`
          @keyframes scale-in {
            from {
              opacity: 0;
              transform: scale(0.9);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
          .animate-scale-in {
            animation: scale-in 0.2s ease-out;
          }
        `}</style>
      </div>
    </div>
  );
};

export default JobDetailsPage;
