package com.example.chef_ai_backend.mapper;

import com.example.chef_ai_backend.model.Post;
import com.example.chef_ai_backend.model.Comment;
import org.apache.ibatis.annotations.Param;
import java.util.List;

public interface CommunityMapper {

    // 帖子列表（仅展示审核通过+正常）
    List<Post> listApprovedPosts(@Param("keyword") String keyword,
                                 @Param("userId") Long userId,
                                 @Param("offset") int offset,
                                 @Param("limit") int limit);

    int countApprovedPosts(@Param("keyword") String keyword,
                           @Param("userId") Long userId);

    // 本人帖子（可见 pending/rejected）
    List<Post> listMyPosts(@Param("ownerId") Long ownerId,
                           @Param("offset") int offset,
                           @Param("limit") int limit);

    int countMyPosts(@Param("ownerId") Long ownerId);

    // 帖子详情（若非作者，仅返回 approved+normal）
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

    // 点赞/收藏 幂等
    int insertPostLike(@Param("postId") Long postId, @Param("userId") Long userId);
    int deletePostLike(@Param("postId") Long postId, @Param("userId") Long userId);
    int insertFavorite(@Param("postId") Long postId, @Param("userId") Long userId);
    int deleteFavorite(@Param("postId") Long postId, @Param("userId") Long userId);

    // 计数更新
    int incrPostLikeCount(@Param("postId") Long postId, @Param("delta") int delta);
    int incrPostCommentCount(@Param("postId") Long postId, @Param("delta") int delta);

    // 举报
    int insertReport(@Param("targetType") String targetType,
                     @Param("targetId") Long targetId,
                     @Param("reporterId") Long reporterId,
                     @Param("reasonCode") String reasonCode,
                     @Param("text") String text);
}