package com.example.chef_ai_backend.mapper;

import com.example.chef_ai_backend.model.Post;
import com.example.chef_ai_backend.model.Comment;
import org.apache.ibatis.annotations.Param;
import java.util.List;
import java.util.Map;

public interface CommunityMapper {

    // 帖子列表（仅展示审核通过+正常）
    List<Post> listApprovedPosts(@Param("keyword") String keyword,
                                 @Param("userId") Long userId,
                                 @Param("offset") int offset,
                                 @Param("limit") int limit);

    int countApprovedPosts(@Param("keyword") String keyword,
                           @Param("userId") Long userId);

    // 列表视图：联表返回作者昵称与头像
    List<java.util.Map<String, Object>> listApprovedPostsView(@Param("keyword") String keyword,
                                 @Param("userId") Long userId,
                                 @Param("offset") int offset,
                                 @Param("limit") int limit);

    // 本人帖子（可见 pending/rejected）
    List<Post> listMyPosts(@Param("ownerId") Long ownerId,
                           @Param("offset") int offset,
                           @Param("limit") int limit);

    int countMyPosts(@Param("ownerId") Long ownerId);

    // 帖子详情（若非作者，仅返回 approved+normal；作者可见自己的任何状态）
    Post getPostForViewer(@Param("postId") Long postId,
                          @Param("viewerId") Long viewerId);

    // 新增/软删
    int insertPost(Post post);
    int softDeletePost(@Param("postId") Long postId,
                       @Param("ownerId") Long ownerId);

    // 评论列表（同样仅展示审核通过+正常；parentId 为空查一级）
    List<Comment> listApprovedComments(@Param("postId") Long postId,
                                       @Param("parentId") Long parentId,
                                       @Param("offset") int offset,
                                       @Param("limit") int limit);

    int countApprovedComments(@Param("postId") Long postId,
                              @Param("parentId") Long parentId);

    int insertComment(Comment comment);
    int softDeleteComment(@Param("commentId") Long commentId,
                          @Param("ownerId") Long ownerId);

    // 编辑本人评论（仅正常状态）
    int updateComment(@Param("commentId") Long commentId,
                      @Param("ownerId") Long ownerId,
                      @Param("content") String content);

    // 点赞/收藏 幂等
    int insertPostLike(@Param("postId") Long postId, @Param("userId") Long userId);
    int deletePostLike(@Param("postId") Long postId, @Param("userId") Long userId);
    int insertFavorite(@Param("postId") Long postId, @Param("userId") Long userId);
    int deleteFavorite(@Param("postId") Long postId, @Param("userId") Long userId);

    // 计数更新
    int incrPostLikeCount(@Param("postId") Long postId, @Param("delta") int delta);
    int incrPostCommentCount(@Param("postId") Long postId, @Param("delta") int delta);

    // 评论查询/删除（Admin）
    com.example.chef_ai_backend.model.Comment getCommentById(@Param("commentId") Long commentId);
    int hardDeleteComment(@Param("commentId") Long commentId);

    // 举报
    int insertReport(@Param("targetType") String targetType,
                     @Param("targetId") Long targetId,
                     @Param("reporterId") Long reporterId,
                     @Param("reasonCode") String reasonCode,
                     @Param("text") String text);

    // 编辑帖子（仅作者）
    int updatePost(@Param("postId") Long postId,
                   @Param("ownerId") Long ownerId,
                   @Param("content") String content,
                   @Param("mediaJson") String mediaJson,
                   @Param("visibility") Integer visibility);

    // 收藏的帖子列表
    List<Post> listFavoritePosts(@Param("userId") Long userId,
                                 @Param("offset") int offset,
                                 @Param("limit") int limit);
    int countFavoritePosts(@Param("userId") Long userId);

    // 我的评论列表（原始实体）
    List<Comment> listMyComments(@Param("userId") Long userId,
                                 @Param("offset") int offset,
                                 @Param("limit") int limit);
    int countMyComments(@Param("userId") Long userId);

    // 我的评论列表视图：联表返回昵称与头像
    List<java.util.Map<String, Object>> listMyCommentsView(@Param("userId") Long userId,
                                                           @Param("offset") int offset,
                                                           @Param("limit") int limit);

    // ===== 管理端（Admin） =====
    List<Post> listAdminPosts(@Param("keyword") String keyword,
                              @Param("auditStatus") String auditStatus,
                              @Param("status") String status,
                              @Param("userId") Long userId,
                              @Param("offset") int offset,
                              @Param("limit") int limit);
    // 视图：联表返回昵称等附加信息（Map）
    List<java.util.Map<String, Object>> listAdminPostsView(@Param("keyword") String keyword,
                              @Param("auditStatus") String auditStatus,
                              @Param("status") String status,
                              @Param("userId") Long userId,
                              @Param("offset") int offset,
                              @Param("limit") int limit);
    int countAdminPosts(@Param("keyword") String keyword,
                        @Param("auditStatus") String auditStatus,
                        @Param("status") String status,
                        @Param("userId") Long userId);
    Post getPostById(@Param("postId") Long postId);
    int updatePostAuditStatus(@Param("postId") Long postId,
                              @Param("fromStatus") String fromStatus,
                              @Param("toStatus") String toStatus);

    // 管理端：硬删除（真实删除数据库记录）
    int deleteCommentsByPostId(@Param("postId") Long postId);
    int deletePostLikesByPostId(@Param("postId") Long postId);
    int deleteFavoritesByPostId(@Param("postId") Long postId);
    int hardDeletePost(@Param("postId") Long postId);

    // 评论（Admin）
    List<Comment> listAdminComments(@Param("postId") Long postId,
                                    @Param("keyword") String keyword,
                                    @Param("auditStatus") String auditStatus,
                                    @Param("status") String status,
                                    @Param("offset") int offset,
                                    @Param("limit") int limit);
    // 视图：评论联表返回昵称、帖子信息（Map）
    List<java.util.Map<String, Object>> listAdminCommentsView(@Param("postId") Long postId,
                                    @Param("keyword") String keyword,
                                    @Param("auditStatus") String auditStatus,
                                    @Param("status") String status,
                                    @Param("offset") int offset,
                                    @Param("limit") int limit);
    int countAdminComments(@Param("postId") Long postId,
                           @Param("keyword") String keyword,
                           @Param("auditStatus") String auditStatus,
                           @Param("status") String status);
    int updateCommentAuditStatus(@Param("commentId") Long commentId,
                                 @Param("fromStatus") String fromStatus,
                                 @Param("toStatus") String toStatus);

    // 举报（Admin）
    List<Map<String, Object>> listAdminReports(@Param("targetType") String targetType,
                                              @Param("status") String status,
                                              @Param("offset") int offset,
                                              @Param("limit") int limit);
    int countAdminReports(@Param("targetType") String targetType,
                          @Param("status") String status);
    int updateReportStatus(@Param("reportId") Long reportId,
                           @Param("toStatus") String toStatus);
}
